import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { ServiceCategory } from '../data/siteData';

export interface LiveProject {
  id: string;
  title: string;
  category: ServiceCategory;
  websiteUrl: string;
  description: string;
  imageUrl: string;
}

export interface LiveTestimonial {
  id: string;
  clientName: string;
  role: string;
  service: ServiceCategory;
  quote: string;
}

export function usePortfolioData() {
  const [projects, setProjects] = useState<LiveProject[]>([]);
  const [testimonials, setTestimonials] = useState<LiveTestimonial[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribeProjects = onSnapshot(
      projectsQuery,
      (snapshot) => {
        const items: LiveProject[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            title: String(data.title || ''),
            category: (data.category as ServiceCategory) || 'Graphic Design',
            websiteUrl: String(data.websiteUrl || ''),
            description: String(data.description || ''),
            imageUrl: String(data.imageUrl || ''),
          };
        });
        setProjects(items);
        setLoadingProjects(false);
      },
      (error) => {
        setLoadingProjects(false);
        handleFirestoreError(error, OperationType.LIST, 'projects');
      }
    );

    const testimonialsQuery = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsubscribeTestimonials = onSnapshot(
      testimonialsQuery,
      (snapshot) => {
        const items: LiveTestimonial[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            clientName: String(data.clientName || ''),
            role: String(data.role || ''),
            service: (data.service as ServiceCategory) || 'Graphic Design',
            quote: String(data.quote || ''),
          };
        });
        setTestimonials(items);
        setLoadingTestimonials(false);
      },
      (error) => {
        setLoadingTestimonials(false);
        handleFirestoreError(error, OperationType.LIST, 'testimonials');
      }
    );

    return () => {
      unsubscribeProjects();
      unsubscribeTestimonials();
    };
  }, []);

  return {
    projects,
    testimonials,
    loadingProjects,
    loadingTestimonials,
  };
}

export async function createProject(input: {
  title: string;
  category: ServiceCategory;
  websiteUrl: string;
  description: string;
  imageUrl: string;
}) {
  try {
    await addDoc(collection(db, 'projects'), {
      title: input.title.trim().slice(0, 120),
      category: input.category,
      websiteUrl: input.websiteUrl.trim().slice(0, 500),
      description: input.description.trim().slice(0, 2000),
      imageUrl: input.imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'projects');
  }
}

export async function removeProject(projectId: string) {
  try {
    await deleteDoc(doc(db, 'projects', projectId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `projects/${projectId}`);
  }
}

export async function createTestimonial(input: {
  clientName: string;
  role: string;
  service: ServiceCategory;
  quote: string;
}) {
  try {
    await addDoc(collection(db, 'testimonials'), {
      clientName: input.clientName.trim().slice(0, 100),
      role: input.role.trim().slice(0, 120),
      service: input.service,
      quote: input.quote.trim().slice(0, 1200),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'testimonials');
  }
}

export async function removeTestimonial(testimonialId: string) {
  try {
    await deleteDoc(doc(db, 'testimonials', testimonialId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `testimonials/${testimonialId}`);
  }
}

/**
 * Compresses an uploaded image file to a clean JPEG data URL under 550KB
 * so it stores reliably inside a Firestore document.
 */
export function compressImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file.'));
      img.onload = () => {
        const maxWidth = 960;
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable.'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.78);
        if (dataUrl.length > 580000) {
          resolve(canvas.toDataURL('image/jpeg', 0.6));
        } else {
          resolve(dataUrl);
        }
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
