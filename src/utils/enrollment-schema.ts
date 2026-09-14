import { z } from 'zod';

export const enrollmentPrograms = [
  'Full-Day Childcare',
  'Monthly Childcare',
  'Extra Classes',
] as const;

export const enrollmentSchema = z.object({
  parentName: z
    .string()
    .trim()
    .min(2, 'Enter your full name.')
    .max(100, 'Use 100 characters or fewer.'),

  phone: z
    .string()
    .trim()
    .max(25, 'Enter a valid phone number.')
    .refine(
      (value) => {
        const cleaned = value.replace(/[\s()-]/g, '');

        return /^0\d{9}$/.test(cleaned) || /^\+[1-9]\d{7,14}$/.test(cleaned);
      },
      'Enter a number such as 060 742 3467 or +27 60 742 3467.',
    ),

  email: z
    .string()
    .trim()
    .email('Enter a valid email address.')
    .max(254, 'Enter a shorter email address.'),

  childName: z
    .string()
    .trim()
    .min(2, 'Enter your child’s full name.')
    .max(100, 'Use 100 characters or fewer.'),

  childAge: z
    .string()
    .trim()
    .regex(/^\d{1,2}(\.\d{1,2})?$/, 'Enter an age in years, such as 4 or 0.5.'),

  program: z
    .string()
    .refine(
      (value) => enrollmentPrograms.some((program) => program === value),
      'Choose a program.',
    ),

  message: z
    .string()
    .trim()
    .max(2000, 'Use 2,000 characters or fewer.'),
});

export type EnrollmentValues = z.infer<typeof enrollmentSchema>;