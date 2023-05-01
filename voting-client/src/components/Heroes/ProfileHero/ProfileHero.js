import { useAuth } from "../../../Globals/authContext"

export const ProfileHero = () => {

    const authContext = useAuth();

    return (
        <section class="bg-gray-50">
            <div
                class="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:min-h-[30vh] lg:items-center"
            >
                <div class="mx-auto max-w-xl text-center">
                    <h1 class="text-3xl font-extrabold sm:text-5xl">
                        Welcome, &nbsp;
                        <strong class="font-extrabold text-red-700 sm:block">
                        {authContext.userData.name}
                        </strong>
                    </h1>

                    <p class="mt-4 sm:text-xl/relaxed">
                        View Details about your profile here.
                    </p>

                    <div class="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                        class="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                        onClick={() => authContext.logout()}
                        >
                        Logout
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}