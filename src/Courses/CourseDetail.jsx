import { React, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { X } from "lucide-react";

const courseData = {
  1: {
    title: "Full Stack Web Development",
    videoUrls: [
      {
        url: "https://www.youtube.com/embed/kUMe1FH4CHE?si=WTCBYll7E6aS4ORk",
        title: "HTML Basics",
      },
      { url: "https://www.youtube.com/embed/1Rs2ND1ryYc", title: "CSS Basics" },
      {
        url: "https://www.youtube.com/embed/jS4aFq5-91M?si=6UblTmbXIU_rPEco",
        title: "JavaScript Essentials",
      },
      {
        url: "https://www.youtube.com/embed/bMknfKXIFA8?si=CGR4tyzqjLvq5uOX",
        title: "React Overview",
      },
      {
        url: "https://www.youtube.com/embed/Oe421EPjeBE?si=DElxcMSHWBXoEhkz",
        title: "Node.js & Express",
      },
      {
        url: "https://www.youtube.com/embed/_7UQPve99r4?si=2C3zB94olYlc7gEl",
        title: "MongoDB Basics",
      },
    ],
    slug: "Full Stack Web Development",
    content:
      "This course includes HTML, CSS, JavaScript, React, Node.js, and MongoDB.",
  },
  2: {
    title: "Python for Data Science",
    videoUrls: [
      {
        url: "https://www.youtube.com/embed/rfscVS0vtbw?si=2OobJrMM-9iwsO3M",
        title: "Python Introduction",
      },
      {
        url: "https://www.youtube.com/embed/vmEHCJofslg?si=QG48zMA97v9teuWh",
        title: "Pandas, NumPy, and Python",
      },
      {
        url: "https://www.youtube.com/embed/FN78JowwpSY?si=4cO439INpWXnH723",
        title: "data visualization techniques",
      },
    ],
    slug: "Python for Data Science",
    content: "Learn Python, NumPy, Pandas, and data visualization techniques.",
  },
  3: {
    title: "Machine Learning with Python",
    videoUrls: [
      {
        url: "https://www.youtube.com/embed/hDKCxebp88A?si=YPInaBK83BagBDE1",
        title: "ML scikit-learn",
      },
      {
        url: "https://www.youtube.com/embed/teWYOMn9Lso?si=WwqV6l8NvMBn-5Dv",
        title: "supervised/unsupervised ML",
      },
    ],
    slug: "Machine Learning with Python",
    content:
      "Includes scikit-learn, supervised/unsupervised ML, and real projects.",
  },
  4: {
    title: "Cybersecurity Fundamentals",
    videoUrls: [
      {
        url: "https://www.youtube.com/embed/PlHnamdwGmw?si=VbASPnw9wx_jQXUL",
        title: "Cyber Security Full Course - Learn Cyber Security In 8 Hours",
      },
      {
        url: "https://www.youtube.com/embed/dz7Ntp7KQGA?si=3nHoC0Q7fjEsVegy",
        title: "Ethical Hacking Full Course for Beginners",
      }
    ],
    slug: "cybersecurity-fundamentals",
    content:
      "You’ll begin with understanding Cyber Security Full Course - Learn Cyber Security In 8 Hours + Ethical Hacking  for Beginners",
  },
  5: {
    title: "Android App Development",
    videoUrls: [
      {
        url: "https://www.youtube.com/embed/EExSSotojVI?si=m-KVCMjFved-pK_g",
        title: "Kotlin Setup & Basics",
      },
      {
        url: "https://www.youtube.com/embed/6_wK_Ud8--0?si=PSTCqq7c5cgRpWfw",
        title: "Jetpack Compose",
      },
      {
        url: "https://www.youtube.com/embed/SV9pJqR41KI?si=H5NbGWjIUBXcHSQp",
        title: "Firebase integration",
      },
    ],
    slug: "Android App Development",
    content:
      "Covers Kotlin, Jetpack Compose, Firebase integration",
  },
  6: {
    title: "AI & Machine Learning",
    videoUrls: [
      {
        url: "https://www.youtube.com/embed/ob1yS9g-Zcs?si=jwyPAZThDg-8XpDI",
        title: "Intro to Neural Networks",
      },
      {
        url: "https://www.youtube.com/embed/kzavQrLyKRw?si=9oDqcUTaiazVr5su",
        title: "Artificial Intelligence ",
      },
    ],
    slug: "AI & Machine Learning",
  },
};

const CourseDetail = () => {
  const { slug } = useParams();
  const course = Object.values(courseData).find((c) => c.slug === slug);
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!course) {
    return <div className="text-white p-6 text-xl">Course not found</div>;
  }

  return (
    <div className="p-10 text-white max-w-4xl mx-auto relative z-10">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">
        {course.title}
      </h1>
      <p className="text-lg text-gray-300 mb-8">{course.content}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {course.videoUrls.map((video, index) => (
          <div
            key={index}
            onClick={() => setSelectedVideo(video)}
            className="bg-[#1a1a2e] p-4 rounded-xl shadow-md hover:shadow-lg transition hover:scale-105 cursor-pointer"
          >
            <p className="mb-2 text-white font-semibold">
              {video.title || `Video ${index + 1}`}
            </p>
            <div className="aspect-video bg-black rounded-md flex items-center justify-center text-yellow-300">
              ▶ Click to Play
            </div>
          </div>
        ))}

        <div className="md:col-span-2 flex justify-center mt-4">
          <Link to="/courses">
            <button className="bg-yellow-300 hover:bg-yellow-400 text-black cursor-pointer font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300">
              Back to courses
            </button>
          </Link>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] aspect-video">
            <h2 className="absolute -top-10 text-xl font-semibold text-yellow-300 text-center w-full">
              {selectedVideo?.title || "Course Video"}
            </h2>
            <iframe
              className="w-full h-full rounded-lg"
              src={selectedVideo?.url}
              title={selectedVideo?.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <img src={selectedVideo?.coverPage} alt="" />

            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
