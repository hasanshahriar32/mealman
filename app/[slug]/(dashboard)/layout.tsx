import Footer from '@/components/global/footer/footer';
import Navigation from '@/components/global/nav/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Navigation />
      {children}
      <Footer />
    </section>
  );
}
