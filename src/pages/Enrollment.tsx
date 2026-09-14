import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  enrollmentPrograms,
  enrollmentSchema,
  type EnrollmentValues,
} from '../utils/enrollment-schema';

type Notice = {
  type: 'success' | 'error';
  message: string;
};

const defaultValues: EnrollmentValues = {
  parentName: '',
  phone: '',
  email: '',
  childName: '',
  childAge: '',
  program: '',
  message: '',
};

const inputClass =
  'mt-2 w-full rounded-xl border border-maroon/40 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/60 aria-[invalid=true]:border-red-700';

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 text-sm text-red-700">
      {message}
    </p>
  );
}

function Enrollment() {
  const [notice, setNotice] = useState<Notice | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues,
    mode: 'onBlur',
  });

  async function submitApplication(values: EnrollmentValues) {
    setNotice(null);

    const endpoint = import.meta.env.VITE_ENROLLMENT_URL?.trim();

    if (!endpoint) {
      setNotice({
        type: 'error',
        message:
          'Online applications are not open yet. Please call 060 742 3467 to enquire.',
      });

      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(values),
        signal: controller.signal,
        redirect: 'follow',
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error('The server did not confirm the application.');
      }

      const result: unknown = await response.json();

      if (
        typeof result !== 'object' ||
        result === null ||
        !('success' in result) ||
        result.success !== true
      ) {
        throw new Error('The application was not confirmed.');
      }

      reset();

      setNotice({
        type: 'success',
        message:
          'Your application has been received. Our team will contact you about the next steps.',
      });
    } catch {
      setNotice({
        type: 'error',
        message:
          'We could not confirm receipt of your application. Your details are still here. Please check your email or call 060 742 3467 before submitting again.',
      });
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <section
      id="enrollment"
      aria-labelledby="enrollment-title"
      className="scroll-mt-36 bg-white py-14 sm:py-20"
    >
      <div className="page-container">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold tracking-widest text-maroon uppercase">
              Join our community
            </p>

            <h2
              id="enrollment-title"
              className="mt-4 text-3xl font-bold text-maroon sm:text-4xl lg:text-5xl"
            >
              A bright beginning starts here.
            </h2>

            <p className="mt-5 leading-relaxed">
              Tell us a little about your family and the care or learning support
              you are looking for.
            </p>

            <div className="mt-8 rounded-3xl border border-coral bg-cream p-6">
              <h3 className="text-2xl font-bold text-maroon">
                What happens next?
              </h3>

              <p className="mt-4 leading-relaxed">
                Our team will review your application and contact you to discuss
                availability, fees, and arrangements.
              </p>

              <p className="mt-4 text-sm">
                Submitting this form does not confirm a place.
              </p>
            </div>

            <a
              href="tel:+27607423467"
              className="mt-6 inline-flex min-h-11 items-center rounded font-semibold text-maroon underline underline-offset-4"
            >
              Prefer to call? 060 742 3467
            </a>
          </div>

          <form
            noValidate
            aria-labelledby="enrollment-title"
            aria-busy={isSubmitting}
            onSubmit={handleSubmit(submitApplication, () => {
              setNotice({
                type: 'error',
                message: 'Please check the highlighted fields.',
              });
            })}
            className="rounded-3xl border border-maroon/10 bg-cream p-6 sm:p-8"
          >
            <p className="mb-6 text-sm">
              All fields are required except the message.
            </p>

            <fieldset disabled={isSubmitting} className="min-w-0">
              <legend className="sr-only">Application details</legend>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="parentName" className="font-medium">
                    Parent or guardian name
                  </label>

                  <input
                    id="parentName"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    aria-invalid={Boolean(errors.parentName)}
                    aria-describedby={
                      errors.parentName ? 'parentName-error' : undefined
                    }
                    className={inputClass}
                    {...register('parentName')}
                  />

                  <FieldError
                    id="parentName-error"
                    message={errors.parentName?.message}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="font-medium">
                    Phone number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="060 742 3467"
                    required
                    maxLength={25}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={inputClass}
                    {...register('phone')}
                  />

                  <FieldError id="phone-error" message={errors.phone?.message} />
                </div>

                <div>
                  <label htmlFor="email" className="font-medium">
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={inputClass}
                    {...register('email')}
                  />

                  <FieldError id="email-error" message={errors.email?.message} />
                </div>

                <div>
                  <label htmlFor="childName" className="font-medium">
                    Child&apos;s full name
                  </label>

                  <input
                    id="childName"
                    type="text"
                    autoComplete="section-child name"
                    required
                    maxLength={100}
                    aria-invalid={Boolean(errors.childName)}
                    aria-describedby={
                      errors.childName ? 'childName-error' : undefined
                    }
                    className={inputClass}
                    {...register('childName')}
                  />

                  <FieldError
                    id="childName-error"
                    message={errors.childName?.message}
                  />
                </div>

                <div>
                  <label htmlFor="childAge" className="font-medium">
                    Child&apos;s age in years
                  </label>

                  <input
                    id="childAge"
                    type="text"
                    inputMode="decimal"
                    placeholder="For example, 4"
                    required
                    maxLength={5}
                    aria-invalid={Boolean(errors.childAge)}
                    aria-describedby={
                      errors.childAge
                        ? 'childAge-hint childAge-error'
                        : 'childAge-hint'
                    }
                    className={inputClass}
                    {...register('childAge')}
                  />

                  <p id="childAge-hint" className="mt-2 text-sm">
                    For a baby aged 6 months, enter 0.5.
                  </p>

                  <FieldError
                    id="childAge-error"
                    message={errors.childAge?.message}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="program" className="font-medium">
                    Program interested in
                  </label>

                  <select
                    id="program"
                    required
                    aria-invalid={Boolean(errors.program)}
                    aria-describedby={
                      errors.program ? 'program-error' : undefined
                    }
                    className={inputClass}
                    {...register('program')}
                  >
                    <option value="">Select a program</option>

                    {enrollmentPrograms.map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>

                  <FieldError
                    id="program-error"
                    message={errors.program?.message}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="font-medium">
                    Message (optional)
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    maxLength={2000}
                    placeholder="For extra classes, tell us the grade and subjects. For childcare, let us know your preferred arrangements."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                    className={`${inputClass} resize-y`}
                    {...register('message')}
                  />

                  <FieldError
                    id="message-error"
                    message={errors.message?.message}
                  />
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed">
                We will use these details to respond to your application and
                discuss enrollment.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="button button-primary mt-6 w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      {notice && (
        <div
          role={notice.type === 'error' ? 'alert' : 'status'}
          aria-atomic="true"
          className={`fixed right-4 bottom-4 left-4 z-[60] rounded-2xl border bg-white p-5 text-charcoal shadow-xl sm:left-auto sm:w-96 ${
            notice.type === 'error' ? 'border-red-700' : 'border-maroon'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-maroon">
                {notice.type === 'success'
                  ? 'Application received'
                  : 'Please check'}
              </p>

              <p className="mt-2 text-sm leading-relaxed">{notice.message}</p>
            </div>

            <button
              type="button"
              onClick={() => setNotice(null)}
              aria-label="Dismiss notification"
              className="flex size-11 shrink-0 items-center justify-center rounded-lg text-xl text-maroon hover:bg-cream"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Enrollment;