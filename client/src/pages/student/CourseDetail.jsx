import BuyCourseButton from "@/components/BuyCourseButton";
 import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailsQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, PlayCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;

  const { data, isLoading, isError } = useGetCourseDetailsQuery(courseId);
  const { course } = data || {};

  const [currentVideo, setCurrentVideo] = useState(null);

  // Set the first lecture video when the course data is available
  useEffect(() => {
    if (course?.lectures?.length > 0) {
      setCurrentVideo(course.lectures[0]);
    }
  }, [course]);

  if (isLoading) return <h1 className="mt-10 text-center">Loading...</h1>;
  if (isError) return <h1 className="mt-10 text-center">Failed to load course details</h1>;

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-gray-800 dark:to-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-4xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg">{course?.courseSubTitle}</p>
          <p>
            Created By{" "}
            <span className="text-blue-300 underline italic">
              {course?.creator?.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt?.split("T")[0]}</p>
          </div>
          <p>Students enrolled: 576</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section - Course Content */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl dark:text-white">Description</h1>
          <p
            className="text-sm dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: course?.description }}
          />
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Course Content</CardTitle>
              <CardDescription className="dark:text-gray-300">
                {course?.lectures?.length} Lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures?.map((lecture, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
                  onClick={() => setCurrentVideo(lecture)} // Update current video
                >
                  <span>
                    <PlayCircle size={14} />
                  </span>
                  <p className="dark:text-gray-200">{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Video Player and Details */}
        <div className="w-full lg:w-1/3">
          <Card className="dark:bg-gray-800">
            <CardContent className="p-4 flex flex-col">
              {/* Video Player */}
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={currentVideo?.videoUrl || ""}
                  controls={true}
                />
              </div>

              {/* Video and Course Details */}
              <h1 className="dark:text-white">
                {currentVideo?.lectureTitle || "No video selected"}
              </h1>
              <Separator className="my-2 dark:bg-gray-600" />
              <h1 className="dark:text-gray-300">{course?.courseTitle}</h1>
              <h1 className="text-lg md:text-xl font-semibold   ">
                ₹{course?.coursePrice}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              <BuyCourseButton courseId={courseId} />
            </CardFooter>
          </Card>
        </div>
      </div>
      
    </div>
  );
};

export default CourseDetail;
