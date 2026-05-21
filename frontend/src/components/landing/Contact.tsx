export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-lg">
        <h2 className="mb-4 text-4xl font-bold text-white">Contact Us</h2>

        <p className="mb-8 text-slate-400">
          Have questions or feedback? Reach out anytime.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Your Name"
            className="rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none"
          />

          <input
            placeholder="Your Email"
            className="rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none"
          />
        </div>

        <textarea
          rows={5}
          placeholder="Your Message"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none"
        />

        <button className="mt-6 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105">
          Send Message
        </button>
      </div>
    </section>
  );
}
