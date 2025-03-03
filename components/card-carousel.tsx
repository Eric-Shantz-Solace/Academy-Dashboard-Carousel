"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Card data
const cards = [
  {
    id: 1,
    title: "Performance Tuning for DMR",
    description: "This course will take you deep into Dynamic Message Routing (DMR), the key to connecting brokers and dynamically routing messages across your network.",
    image: "/DMR.jpeg?height=200&width=300",
    url: "https://training.solace.com/learn/courses/592/performance-tuning-for-dmr?hash=d1d3342c2f84f750e667bb582a6c43f875503cd4&generated_by=30610",
  },
  {
    id: 2,
    title: "Event Portal Essentials",
    description: "By the end of this workshop you will name the problems Event Portal is designed to solve — and in solving them, show the innovation potential it unleashes.",
    image: "/event-portal.jpeg?height=200&width=300",
    url: "https://training.solace.com/learn/courses/503/solace-essentials?hash=66cedbb8e302d4d536783c02ce80de0c06189bc9&generated_by=30610",
  },
  {
    id: 3,
    title: "TTT - Quarterly PLM Coffee Chats",
    description: "These PLM Chats will focus on areas which inspired questions during the Roadmap Update Sessions",
    image: "/PLM-TTT.jpeg?height=200&width=300",
    url: "https://training.solace.com/learn/courses/561/ttt-quarterly-plm-coffee-chats?hash=0ea5b36d6e0b4cde28857d3e1e16e084beebdf14&generated_by=30610",
  },
  {
    id: 4,
    title: "Topic Naming Standard",
    description: "This blog post explores the importance of standardized Topic Naming in Event-Driven Architecture (EDA) for ensuring consistency and interoperability.",
    image: "/topic-linkedin.png?height=200&width=300",
    url: "https://www.linkedin.com/posts/stephen-tsoi-16309730_eda-dda-eventdrivenarchtecture-activity-7275860905735725056-h4-s/?utm_source=share&utm_medium=member_desktop",
  },
  {
    id: 5,
    title: "TTT- EP Self-service access to event data and Winning with Event Portal",
    description: "In Q2, we launched new EP capabilities, shared success stories, and outlined future roadmap developments while ending support for EP 1.0.",
    image: "/ttt-ep.jpeg?height=200&width=300",
    url: "https://training.solace.com/learn/courses/573/ttt-ep-self-service-access-to-event-data-and-winning-with-event-portal?hash=23aead412a4fa28f855a6028307bc146d25b7ce5&generated_by=30610",
  },
]

// Double the cards array for seamless infinite scroll
const infiniteCards = [...cards, ...cards]

export default function CardCarousel() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    // Get the actual index within the original cards array
    const actualIndex = api.selectedScrollSnap() % cards.length
    setCurrent(actualIndex)

    api.on("select", () => {
      const actualIndex = api.selectedScrollSnap() % cards.length
      setCurrent(actualIndex)
    })
  }, [api])

  return (
    <div className="w-full px-4 py-12">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          skipSnaps: true,
          duration: 10,
        }}
        className="w-full max-w-7xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {infiniteCards.map((card, index) => (
            <CarouselItem
              key={`${card.id}-${index}`}
              className="pl-2 md:pl-4 basis-[85%] md:basis-[45%] lg:basis-[35%] transition-all duration-500"
            >
              <Link href={card.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="relative h-full transition-all duration-500 ease-in-out">
                  <Card
                    className={cn(
                      "h-full transition-all duration-500 ease-in-out",
                      current === index % cards.length
                        ? "scale-110 shadow-2xl bg-card"
                        : "scale-[0.65] opacity-40 shadow-md blur-[1px] -mx-8",
                    )}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={card.image || "/placeholder.svg"}
                          alt={card.title}
                          fill
                          className={cn(
                            "object-cover transition-all duration-500",
                            current === index % cards.length
                              ? "brightness-110 saturate-105"
                              : "brightness-75 saturate-50",
                          )}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start p-4">
                      <h3
                        className={cn(
                          "text-lg font-semibold mb-1 transition-all duration-500",
                          current === index % cards.length ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm transition-all duration-500",
                          current === index % cards.length ? "text-muted-foreground" : "text-muted-foreground/50",
                        )}
                      >
                        {card.description}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex flex-col items-center gap-8 mt-12">
          <div className="flex justify-center gap-4">
            <CarouselPrevious className="relative static h-11 w-11" />
            <CarouselNext className="relative static h-11 w-11" />
          </div>

          <div className="flex items-center justify-center gap-3">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C895]",
                  current === index ? "bg-[#00C895]" : "bg-[#E5E7EB] hover:bg-[#D1D5DB]",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  )
}

