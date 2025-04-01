import connectDB from "@/lib/server/connect"

export async function POST(req: Request) {
  try {
    const { title, rate, image, caption, userId } = await req.json()

    console.log({ title, rate, image, caption, userId })
    // await connectDB()
    // Save book to database here...
    const response = await fetch('http://localhost:8000/api/books/create-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, rate, image, caption, userId }),
    }) 
    // const response = (await Book.create({ title, rate, image, caption, user: userId })).populate('user')
    console.log('api response', response)

    return new Response(JSON.stringify(response), { status: 201 })

  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Error creating book' }), { status: 500 })
  }
}