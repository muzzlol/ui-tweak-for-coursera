import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface CourseProps {
  course: {
    id: number
    title: string
    instructor: string
    rating: number
    reviews: number
    price: string
    originalPrice: string
    image: string
    premium?: boolean
    bestseller?: boolean
    categoryId?: string
    topicIds?: string[]
  }
}

export default function CourseCard({ course }: CourseProps) {
  return (
    <Card className="overflow-hidden border hover:shadow-md transition-shadow">
      <Link href="#" className="block">
        <div className="relative h-40">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-base line-clamp-2 mb-1">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-1 line-clamp-1">{course.instructor}</p>

          <div className="flex items-center gap-1 mb-1">
            <span className="font-bold text-amber-800">{course.rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({course.reviews.toLocaleString()})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold">{course.price}</span>
            <span className="text-gray-500 line-through text-sm">{course.originalPrice}</span>
          </div>

          <div className="flex gap-2 mt-2">
            {course.premium && (
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs font-normal">
                Premium
              </Badge>
            )}
            {course.bestseller && (
              <Badge variant="outline" className="bg-teal-100 text-teal-800 border-teal-200 text-xs font-normal">
                Bestseller
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

