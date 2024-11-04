
export default function CreateTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium bold text-gray-900 mb-6">
        Create or Join a Schedule
      </h1>
    <main className="flex-1 overflow-y-auto p-0 lg:p-4">{children}</main>
    </section>
  );
}
