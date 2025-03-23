"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/course-card"
import { categories, topics, type courses, getTopicsByCategoryId, getCoursesByTopicId } from "@/lib/data"

export default function Home() {
  // State for active category and topic
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [activeTopic, setActiveTopic] = useState("")
  const [filteredTopics, setFilteredTopics] = useState<typeof topics>([])
  const [filteredCourses, setFilteredCourses] = useState<typeof courses>([])
  const [activeTopicName, setActiveTopicName] = useState("")

  // Effect to update topics when category changes
  useEffect(() => {
    const topicsForCategory = getTopicsByCategoryId(activeCategory)
    setFilteredTopics(topicsForCategory)

    // Set default active topic if not set or if category changed
    if (!activeTopic || !topicsForCategory.find((t) => t.id === activeTopic)) {
      setActiveTopic(topicsForCategory[0]?.id || "")
      setActiveTopicName(topicsForCategory[0]?.name || "")
    }
  }, [activeCategory])

  // Effect to update courses when topic changes
  useEffect(() => {
    if (activeTopic) {
      const coursesForTopic = getCoursesByTopicId(activeTopic)
      setFilteredCourses(coursesForTopic)

      // Update active topic name for display
      const currentTopic = topics.find((t) => t.id === activeTopic)
      if (currentTopic) {
        setActiveTopicName(currentTopic.name)
      }
    }
  }, [activeTopic])

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  const handleTopicChange = (topicId: string) => {
    setActiveTopic(topicId)
  }

  // Get active category name for display
  const activeCategoryName = categories.find((cat) => cat.id === activeCategory)?.name || ""

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">All the skills you need in one place</h1>
          <p className="text-lg text-gray-600">
            From critical skills to technical topics, we support your professional development.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="border-b mb-8">
          <nav className="flex overflow-x-auto pb-1 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`whitespace-nowrap px-4 py-3 font-medium text-sm ${
                  category.id === activeCategory
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Topics List */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filteredTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicChange(topic.id)}
              className={`rounded-full px-6 py-3 text-sm ${
                topic.id === activeTopic
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Show All Button */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="border-purple-700 text-purple-700 hover:bg-purple-50">
            Show all {activeTopicName} courses
          </Button>
        </div>
      </div>
    </main>
  )
}
