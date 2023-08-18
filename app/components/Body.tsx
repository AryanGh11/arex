import Image from "next/image";
import { prisma } from "@/util/prisma";
import Items from "./Items";
import Posts from "./Posts";
import FAGs from "./FAQs";
import Link from "next/link";
import PrimaryButton from "./PrimaryButton";

export default async function Body() {
  const trendingItems = await prisma.product.findMany({ take: 5 });
  const banners = await prisma.banner.findMany();
  const posts = await prisma.posts.findMany({ take: 5 });
  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Banners */}
      <div className="grid grid-rows-1 grid-flow-col overflow-x-scroll overflow-y-hidden no-scrollbar aspect-video md:mx-20 md:w-[calc(100vw-10rem) md:gap-10 md:aspect-auto">
        {banners.map((banner) => (
          <div className="justify-center items-start max-h-[600px] flex-col md:w-[calc(100vw-10rem)] w-screen bg-blue-400">
            <Image
              src={banner.image}
              alt={banner.title}
              width={720}
              height={720}
              className="w-full object-cover h-full"
            />
            <div className="-mt-24 ml-8 z-10 w-fit">
              <h1 className="text-4xl text-neutral font-bold bg-secondary w-fit">
                {banner.title}
              </h1>
              <h1 className="text-neutral">{banner.description}</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 text-center px-6">
        <h1 className="font-normal tracking-widest">TRENDING</h1>
        <h1 className="font-bold tracking-wider text-2xl pr-4">
          Shop our popular candle products
        </h1>
      </div>
      {/* Trending items */}
      <div className="flex flex-col px-6 gap-10 md:flex-row md:px-20 md:items-start md:justify-center">
        {trendingItems.map((trending) => (
          <Items
            tag={trending.tag}
            id={trending.id}
            image={trending.image}
            name={trending.name}
            finalPrice={trending.finalPrice}
            regularPrice={trending.regularPrice}
            description={trending.description}
            category={trending.category}
            key={trending.id}
          />
        ))}
      </div>
      <div className="w-full px-6 flex justify-center">
        <Link href={"/products"}>
          <PrimaryButton text="Show more" disable={false} />
        </Link>
      </div>
      {/* Posts */}
      <div className="flex flex-col gap-6 px-6 md:grid md:grid-flow-col md:auto-cols-fr">
        {posts.map((post) => (
          <Posts
            id={post.id}
            title={post.title!}
            image={post.image!}
            description={post.description!}
            key={post.id}
          />
        ))}
      </div>
      <FAGs />
    </div>
  );
}
