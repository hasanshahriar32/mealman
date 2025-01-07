import Link from "next/link";
import { redirect } from "next/navigation";

import { getTeamForUser, getUser } from "@/lib/db/queries";
import { CircleIcon} from "lucide-react";
import NavMenu from "./navMenu";
import TeamNavigation from "./teamNavigation";


const Navigation = async () => {

  const user = await getUser().then((user) => {
    //@ts-expect-error
    delete user?.passwordHash;
    return user;
  });
  
  // if (!user) {
  //   redirect('/sign-in');
  // }
  //@ts-expect-error
  const teamData = await getTeamForUser(user?.id);

  // if (!teamData) {
  //   throw new Error('Team not found');
  // }

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <CircleIcon className="h-6 w-6 text-orange-500" />
            {/* <span className="ml-2 text-xl font-semibold text-gray-900">
            AminMess
          </span> */}
          </Link>
          <span className="ml-2 text-xl font-semibold text-gray-900">
            <TeamNavigation teamData={[teamData]} />
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <NavMenu />
        </div>
      </div>
    </header>
  );
};
export default Navigation;
