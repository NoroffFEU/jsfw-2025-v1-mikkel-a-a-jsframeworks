"use client";

import { useState } from "react";

interface FormErrors {
  name?: string;
  subject?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const name = form.get("name") as string;
    const subject = form.get("subject") as string;
    const email = form.get("email") as string;
    const message = form.get("message") as string;

    const newErrors: FormErrors = {};

    if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Message sent successfully");
      e.currentTarget.reset();
    }
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Contact</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="name"
            placeholder="Full Name"
            className="w-full rounded border p-3"
          />
          {errors.name && <p className="mt-1 text-red-500">{errors.name}</p>}
        </div>

        <div>
          <input
            name="subject"
            placeholder="Subject"
            className="w-full rounded border p-3"
          />
          {errors.subject && (
            <p className="mt-1 text-red-500">{errors.subject}</p>
          )}
        </div>

        <div>
          <input
            name="email"
            placeholder="Email"
            className="w-full rounded border p-3"
          />
          {errors.email && <p className="mt-1 text-red-500">{errors.email}</p>}
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Message"
            className="w-full rounded border p-3"
            rows={5}
          />
          {errors.message && (
            <p className="mt-1 text-red-500">{errors.message}</p>
          )}
        </div>

        <button className="rounded bg-black px-5 py-3 text-white">
          Send
        </button>
      </form>
    </main>
  );
}