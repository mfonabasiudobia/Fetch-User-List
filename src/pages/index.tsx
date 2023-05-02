import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { axios } from "@config";
import Link from "next/link";

interface tableItemInterface {
  name: {
    first: string;
    last: string;
  };
  location: {
    country: string;
  };
  email: string;
  phone: string;
  id: {
    value: string;
  };
}

const styles = {
  selectBox: `py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`,
  previous: `py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`,
  table: `table-auto text-left border-collapse w-full whitespace-nowrap`,
  next: `py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`,
};

const Home = ({ users }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  const handleNextPage = () => setCurrentPage((currentPage) => currentPage + 1);

  const handlePrevPage = () => setCurrentPage((currentPage) => currentPage - 1);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="w-full p-5 space-y-3 overflow-x-auto">
      <h1 className="font-bold text-xl">List Of Users</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Country</th>
            <th>Email Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((item: tableItemInterface, index: React.Key) => (
            <tr key={index}>
              <td>
                <Link href={`/details/${item.id.value}`} legacyBehavior>
                  <a className="font-bold hover:underline">
                    {item.name.first} {item.name.last}
                  </a>
                </Link>
              </td>
              <td>{item.location.country}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="flex items-center justify-between">
        <select
          value={usersPerPage}
          onChange={handlePerPageChange}
          className={styles.selectBox}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>

        <div className="space-x-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`${styles.previous} ${
              currentPage === 1 && "cursor-not-allowed"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastUser >= users.length}
            className={`${styles.next} ${
              indexOfLastUser >= users.length && "cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get("?results=50");

  return { props: { users: data.results } };
};
