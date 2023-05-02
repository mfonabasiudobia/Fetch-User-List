import { GetServerSideProps } from "next";
import { axios } from "@config";
import Image from "next/image";
import Moment from "react-moment";

interface UsersDetailsPageModel {
  user: any;
}

const UsersDetailsPage: React.FC<UsersDetailsPageModel> = ({ user }) => {
  return (
    <div className="space-y-5">
      <section className="bg-pink-200 min-h-[30vh] flex flex-col space-y-2 items-center justify-center py-2">
        <Image
          src={user.picture.large}
          width={100}
          height={100}
          alt="Profile Image"
          className="rounded-full"
        />
        <ul className="text-center">
          <li>
            {user.name.first} {user.name.last}
          </li>
          <li>{user.email}</li>
          <li>{user.phone}</li>
          <li>{user.location.country}</li>
        </ul>
      </section>

      <section className="rounded-lg bg-gray-50 p-3 md:w-1/3">
        <h2 className="font-bold">Other Details</h2>
        <ul>
          <li>City: {user.location.city}</li>
          <li>Nationality: {user.nat}</li>
          <li>
            Date of Birth: <Moment date={user.dob.date} format="d/M/Y" />
          </li>
        </ul>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const { data } = await axios.get(`?id=${id}`);

  return { props: { user: data.results[0] } };
};

export default UsersDetailsPage;
