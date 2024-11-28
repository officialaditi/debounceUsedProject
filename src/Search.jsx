import { useState } from "react";
import userData from "./userData";
import { useDebounce } from "./useDebounce";

const occupations = [
  "Software Engineer",
  "Teacher",
  "Data Analyst",
  "Graphic Designer",
  "Accountant",
  "Marketing Manager",
];
const statuses = ["Unmarried", "Married", "Single"];
const bloodGroups = ["O+", "A+", "B+", "AB+", "O-", "B-"];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [occupationFilter, setOccupationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");

  // using debounce hook
  const debouncedValue = useDebounce(searchTerm, 300);

  const filteredUsers = userData.filter((user) => {
    return (
      (user.firstName.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        user.fatherName.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        user.phoneNumber.includes(debouncedValue)) &&
      (occupationFilter === "" || user.occupation === occupationFilter) &&
      (statusFilter === "" || user.status === statusFilter) &&
      (bloodGroupFilter === "" || user.bloodGroup === bloodGroupFilter)
    );
  });

  return (
    <>
      <div className="flex gap-4 p-4">
        {/* Left Side - Filters */}
        <div className="w-1/4 bg-gray-100 p-4 rounded">
          <input
            type="text"
            placeholder="Search by name, father's name, or phone"
            className="p-2 border rounded w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <label className="block mb-2">Occupation</label>
          <select
            className="p-2 border rounded w-full mb-4"
            value={occupationFilter}
            onChange={(e) => setOccupationFilter(e.target.value)}
          >
            <option value="">All</option>
            {occupations.map((occupation) => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>

          <label className="block mb-2">Status</label>
          <select
            className="p-2 border rounded w-full mb-4"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <label className="block mb-2">Blood Group</label>
          <select
            className="p-2 border rounded w-full mb-4"
            value={bloodGroupFilter}
            onChange={(e) => setBloodGroupFilter(e.target.value)}
          >
            <option value="">All</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Right Side - Search Results */}
        <div className="w-2/3 grid md:grid-cols-3 grid-cols-1 gap-4 ">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow-md bg-white"
              >
                <img
                  src={user.img}
                  alt={user.firstName}
                  className="w-16 h-16 rounded-full mb-4 "
                />
                <h2 className="text-lg font-semibold">{user.firstName}</h2>
                <p>
                  <strong>Father&apos;s Name:</strong> {user.fatherName}
                </p>
                <p>
                  <strong>Blood group:- </strong>
                  {user.bloodGroup}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No users match the search criteria.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
