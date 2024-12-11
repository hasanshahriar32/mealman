import React from 'react';

const page =  async ({ params }: { params: Promise<{ id: string }> }) => {
  const slug = (await params).id;
  return <div>My Post: {slug}</div>;
};

export default page;