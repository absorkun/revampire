import DarkMode from "@/components/darkmode";
import TodoComponent from "@/components/Todo";

export default function Home() {
  return (
    <div className="mx-auto lg:w-3/4 p-2">
      <div className="lg:w-1/2 mx-auto mb-10 mt-2">
        <DarkMode />
      </div>
      <TodoComponent />
    </div>
  )
}