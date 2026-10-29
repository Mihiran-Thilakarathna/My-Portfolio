import { useState } from 'react';
import type { FormEvent } from 'react';

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const isField = (el: Element): el is Field =>
  el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement;

const fieldName = (field: Field) => field.name || field.id;

// Error message for a field, using its data-label (or name)
const messageFor = (field: Field): string | undefined => {
  const label = (field.dataset.label || fieldName(field)).toLowerCase();
  // whitespace-only counts as empty
  if (field.required && !field.value.trim()) return `Please enter your ${label}.`;
  const { validity } = field;
  if (validity.typeMismatch && field.type === 'email') return 'Please enter a valid email address, like name@example.com.';
  if (validity.typeMismatch && field.type === 'url') return 'Please enter a valid link, starting with https://.';
  if (validity.tooShort) return `Your ${label} needs at least ${field.getAttribute('minlength')} characters.`;
  if (validity.tooLong) return `Your ${label} can be at most ${field.getAttribute('maxlength')} characters.`;
  if (!validity.valid) return `Please check your ${label}.`;
  return undefined;
};

// Inline validation instead of the native popups. Use with `noValidate` and <FieldError>.
export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (onValid: (e: FormEvent<HTMLFormElement>) => void) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found: Record<string, string> = {};
    let first: Field | undefined;
    for (const el of Array.from(e.currentTarget.elements)) {
      if (!isField(el) || el.disabled) continue;
      const message = messageFor(el);
      if (!message) continue;
      found[fieldName(el)] = message;
      first ??= el;
    }
    setErrors(found);
    if (first) {
      first.focus();
      return;
    }
    onValid(e);
  };

  // re-validate fields that already show an error
  const recheck = (e: { currentTarget: Field }) => {
    const field = e.currentTarget;
    const name = fieldName(field);
    if (!errors[name]) return;
    const message = messageFor(field);
    setErrors(current => {
      const next = { ...current };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  };

  const fieldProps = (name: string) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    onInput: recheck,
  });

  const reset = () => setErrors({});

  return { errors, handleSubmit, fieldProps, reset };
};
