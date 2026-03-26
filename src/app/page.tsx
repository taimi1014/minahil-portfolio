import Sidebar from "@/components/Sidebar";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <div className="max-w-[1512px] mx-auto flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <ProjectGrid />
    </div>
  );
}
