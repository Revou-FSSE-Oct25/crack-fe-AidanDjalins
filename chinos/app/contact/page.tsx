"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(1),
  phoneNumber: z.string(),
  email: z.string(),
  inquiryType: z.string(),
  message: z.string()
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24">
      <div className="container mx-auto px-8 flex flex-col items-center gap-10">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-[var(--font-montserrat)] font-light text-[0.75rem] tracking-[0.35em] uppercase text-[var(--color-red)] opacity-70">
            Reach Out
          </p>
          <h1 className="font-[Playfair_Display] text-4xl xl:text-5xl font-bold text-[var(--color-red-deep)]">
            Contact <em className="italic font-normal text-[var(--color-red)]">Us</em>
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
            <span className="text-[var(--color-red)] opacity-60 text-lg">☕</span>
            <div className="w-12 h-px bg-[var(--color-red)] opacity-40" />
          </div>
          <p className="font-[var(--font-montserrat)] font-light text-[0.95rem] leading-relaxed text-[var(--color-red-deep)] opacity-70 max-w-[480px]">
            Got a question, complaint, or want us to host your next event? Fill out the form below and we&apos;ll get back to you.
          </p>
        </div>

        {/* Form card */}
        <div className="w-full max-w-2xl bg-white/60 border border-[rgba(178,22,0,0.1)] px-10 py-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-7">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name..."
                  className="border-[var(--color-red-deep)] border-opacity-20 focus:border-[var(--color-red)] rounded-none font-[var(--font-montserrat)]"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="font-[var(--font-montserrat)] text-[0.75rem] text-[var(--color-red)]">{form.formState.errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80">
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter your phone number..."
                  className="border-[var(--color-red-deep)] border-opacity-20 focus:border-[var(--color-red)] rounded-none font-[var(--font-montserrat)]"
                  {...form.register("phoneNumber")}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="Enter your email..."
                  className="border-[var(--color-red-deep)] border-opacity-20 focus:border-[var(--color-red)] rounded-none font-[var(--font-montserrat)]"
                  {...form.register("email")}
                />
              </div>

              {/* Inquiry type */}
              <div className="flex flex-col gap-1.5">
                <label className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80">
                  Inquiry Type
                </label>
                <Select {...form.register("inquiryType")}>
                  <SelectTrigger className="rounded-none font-[var(--font-montserrat)] border-[var(--color-red-deep)] border-opacity-20">
                    <SelectValue placeholder="Select inquiry type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Question Inquiry">Question Inquiry</SelectItem>
                    <SelectItem value="Complaint Inquiry">Complaint Inquiry</SelectItem>
                    <SelectItem value="Event Inquiry">Event Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-[var(--font-montserrat)] text-[0.8rem] tracking-[0.1em] uppercase text-[var(--color-red-deep)] opacity-80">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  className="border-[var(--color-red-deep)] border-opacity-20 focus:border-[var(--color-red)] rounded-none font-[var(--font-montserrat)] min-h-[140px]"
                  {...form.register("message")}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="mt-2 font-[var(--font-montserrat)] text-[0.75rem] tracking-[0.2em] uppercase px-9 py-[0.9rem] bg-[var(--color-red)] text-[var(--color-cream)] border border-[var(--color-red)] cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-[var(--color-red)] hover:-translate-y-0.5 w-full"
              >
                Send Message
              </Button>

            </form>
          </Form>
        </div>

      </div>
    </main>
  );
}