import CardCarousel from "@/components/card-carousel"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Featured Content</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a look at what Solace has been up to. 
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on any card to learn more.
          </p>
        </div>
        <CardCarousel />
      </div>
    </main>
  )
}

