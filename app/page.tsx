"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/course-card"
import { ThemeToggle } from "@/components/theme-toggle"
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
    <main className="min-h-screen bg-background dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">All the skills you need in one place</h1>
            <p className="text-lg text-muted-foreground">
              From critical skills to technical topics, we support your professional development.
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Category Navigation */}
        <div className="border-b border-border mb-8">
          <nav className="flex overflow-x-auto pb-1 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`whitespace-nowrap px-4 py-3 font-medium text-sm ${
                  category.id === activeCategory
                    ? "text-foreground border-b-2 border-foreground"
                    : "text-muted-foreground hover:text-foreground"
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
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
          <Button variant="outline" className="border-purple-700 text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            Show all {activeTopicName} courses
          </Button>
        </div>
      </div>
    </main>
  )
}


//asdkjf
