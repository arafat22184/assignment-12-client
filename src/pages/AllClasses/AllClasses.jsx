import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Pagination from "./Pagination";
import { FaSearch, FaFilter } from "react-icons/fa";
import Loading from "../../Shared/Loading";
import ClassCard from "../../components/ClassCard";
import NoClass from "../../components/NoClass";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    difficulty: "",
    skill: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const classesPerPage = 6;

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 800);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // First query to get all classes for filter options
  const { data: allClasses = [] } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes/all");
      return res.data;
    },
  });

  // Main query for paginated results
  const {
    data: classesData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classes", currentPage, debouncedSearchTerm, filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes", {
        params: {
          search: debouncedSearchTerm,
          page: currentPage,
          limit: classesPerPage,
          difficulty: filters.difficulty,
          skill: filters.skill,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  // Extract unique difficulty levels from all classes
  const difficultyOptions = [
    { value: "", label: "All Levels" },
    ...Array.from(
      new Set(allClasses.map((classItem) => classItem.difficultyLevel))
    )
      .filter(Boolean)
      .map((difficulty) => ({
        value: difficulty,
        label: difficulty,
      })),
  ];

  // Extract unique skills from all classes
  const skillOptions = [
    { value: "", label: "All Skills" },
    ...Array.from(new Set(allClasses.flatMap((classItem) => classItem.skills)))
      .filter(Boolean)
      .map((skill) => ({
        value: skill,
        label: skill.charAt(0).toUpperCase() + skill.slice(1),
      })),
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setFilters({
      difficulty: "",
      skill: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">Error loading classes</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        All Fitness Classes
      </h1>

      {/* Search and Filter Bar */}
      <div className="mb-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-gray-300"
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Dropdown */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={filters.difficulty}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
                >
                  {difficultyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skill Focus
                </label>
                <select
                  name="skill"
                  value={filters.skill}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
                >
                  {skillOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 text-gray-300 hover:text-lime-400 transition-colors"
              >
                Reset All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Classes Grid */}
      {classesData.data?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classesData.data.map((classItem) => (
              <ClassCard key={classItem._id} classItem={classItem} />
            ))}
          </div>

          <Pagination
            itemsPerPage={classesPerPage}
            totalItems={classesData.pagination?.total || 0}
            currentPage={currentPage}
            paginate={setCurrentPage}
          />
        </>
      ) : (
        <NoClass
          hasFilters={!!(searchTerm || filters.difficulty || filters.skill)}
          onReset={resetAllFilters}
        />
      )}
    </div>
  );
};

export default AllClasses;
