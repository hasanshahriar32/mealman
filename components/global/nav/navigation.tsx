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
  
  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }
  
  console.log(teamData);

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">
            {/* AminMess */}
          <TeamNavigation teamData={teamData} />
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Pricing
          </Link>
          <NavMenu />
        </div>
      </div>
    </header>
  );
};
export default Navigation;
