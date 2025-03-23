"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Topic {
  id: string
  name: string
  learners: string
  active?: boolean
}

interface TopicScrollerProps {
  topics: Topic[]
  onTopicChange: (topicId: string) => void
}

export default function TopicScroller({ topics, onTopicChange }: TopicScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = 300

      if (direction === "left") {
        current.scrollLeft -= scrollAmount
      } else {
        current.scrollLeft += scrollAmount
      }
    }
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-auto gap-2 py-4 hide-scrollbar scroll-smooth" ref={scrollRef}>
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onTopicChange(topic.id)}
            className={`flex-shrink-0 rounded-full px-6 py-3 flex flex-col items-center justify-center min-w-[180px] transition-colors ${
              topic.active ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            <div className="font-medium text-sm">{topic.name}</div>
            <div className="text-xs opacity-80">{topic.learners} learners</div>
          </button>
        ))}
      </div>

      {topics.length > 0 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full shadow-md bg-white hidden md:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full shadow-md bg-white hidden md:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}

