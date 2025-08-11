import Image from "next/image";

const GoogleButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            className="w-full !py-3 !px-4 grid [grid-template-columns:auto_1fr] place-items-center border border-[#d9d9d9] rounded-lg text-lg cursor-pointer 
             transition-all duration-200 hover:shadow-sm"
            onClick={onClick}
        >
            <Image
                src="https://authjs.dev/img/providers/google.svg"
                width={25}
                height={25}
                alt="Google"
            />
            <p>Sign in with Google</p>
        </button>
    );
};

export default GoogleButton;
