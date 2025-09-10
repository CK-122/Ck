import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background">
       <div className="absolute inset-0 -z-10">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Abstract background"
          data-ai-hint="abstract school"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      </div>
      <div className="w-full max-w-md p-4">{children}</div>
    </div>
  );
}
