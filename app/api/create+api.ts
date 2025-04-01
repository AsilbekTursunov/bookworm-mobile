import { PUBLIC_API } from "@/constants";

export async function POST(req: Request) {
  const bookData = await req.json();
  // try {
  //   const response = await fetch(`${PUBLIC_API}/books/create-book`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(bookData),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const responseData = await response.json();
  //   console.log('Book created successfully:', responseData);
  //   alert('Book recommendation created successfully!');
  //   // Optionally reset form fields here

  // } catch (error: any) {
  //   console.error('Error creating book:', error);
  //   alert(`Failed to create book recommendation: ${error.message}`);
  // } 
  return new Response(JSON.stringify({ message: 'Book recommendation created successfully' }), { status: 201 });
}