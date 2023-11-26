
import RegisterForm from "@/components/Pages/public/auth/forms/register";
import PublicLayout from "@/components/global/layout/publicLayout";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Register = () => {
  return (
    <PublicLayout>
      <div className="flex w-full flex-col justify-center px-5">
        <div className="mx-auto w-full max-w-md py-12 md:max-w-lg lg:max-w-xl 2xl:pb-8 2xl:pt-2">
          <div className="flex flex-col items-center">
            <a className="mb-7 inline-block max-w-[64px] lg:mb-9" href="/">
              <img
                alt="Isomorphic"
                loading="lazy"
                width="61"
                height="38"
                decoding="async"
                data-nimg="1"
                src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg"
              />
            </a>
            <h2 className="rizzui-title-h2 mb-7 text-center text-[28px] font-bold leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl">
              Join us today! Get special benefits and stay up-to-date.
            </h2>
          </div>
          <div className="flex flex-col gap-4 pb-6 md:flex-row md:gap-6 xl:pb-7">
            <button
              className="rizzui-button inline-flex font-medium items-center text-white justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 h-11 w-full"
              type="button"
            >
              <FaGoogle className="h-4 w-4 mr-1 text-yellow-400" />
              <span className="truncate">Signin with Google</span>
            </button>
            <button
              className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-4 py-2 text-sm rounded-md border border-transparent focus-visible:ring-offset-2 bg-blue-600 hover:enabled:bg-blue-dark focus-visible:ring-blue/30 text-white h-11 w-full"
              type="button"
            >
              <FaFacebook className="h-4 w-4 mr-1" />
              <span className="truncate">Signin with Facebook</span>
            </button>
          </div>
          <div className="before:content-[' '] relative  mt-0.5 flex items-center  before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-gray-100 mb-5 2xl:mb-7 justify-center">
            <span className="relative z-10 inline-block bg-white text-sm font-medium text-gray-500 dark:bg-gray-50 2xl:text-base p-2.5">
              Or, Sign up with your email
            </span>
          </div>

          <RegisterForm />
          <p className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
            Already have an account?
            <Link
              className="font-semibold text-gray-700 transition-colors hover:text-primary ml-1"
              href="/auth/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Register;
