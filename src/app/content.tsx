"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";

const Content = () => {
    const paidImages = [
        {
            id: "dress",
            imgUrl: "/assets/wedding-shoes.jpg",
            hover: "Browse for Dress",
        },
        {
            id: "photographer",
            imgUrl: "/assets/img-2.jpg",
            hover: "Browse for Photographer",
        },
        {
            id: "venue",
            imgUrl: "/assets/img-3.jpg",
            hover: "Browse for Venue",
        }
    ]

    const totalGrid = paidImages.length > 3 ? 3 : paidImages.length;

    return (
        <div className={`grid grid-cols-${totalGrid} h-[calc(100vh-6.5rem)] w-full`}>
            <div className="h-[calc(100vh-6.5rem)] text-center text-7xl flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                <motion.div
                initial={{opacity: 1}}
                animate={{opacity: 0}}
                transition={{ delay: 3, staggerChildren: 0.05}}
                >
                    <AnimatedText text="Plan your memories here" />
                </motion.div>
            </div>
            {
                paidImages.map((img, i) => 
                    <motion.div
                    className="relative group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 2.5 + i + 1 }}
                    key={img.id}
                >
                    <Link href={`/directory/${img.id}`} className="block relative w-full h-full">
                        <Image
                            src={img.imgUrl}
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="transition-opacity duration-300 ease-in-out group-hover:opacity-50"
                        />
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center text-4xl text-black font-bold py-2 px-4 rounded opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0.8 }}
                            // whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {img.hover}
                        </motion.div>
                    </Link>
                </motion.div>
                )
            }

        </div>        
    )
}

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

type AnimatedTextProps = {
    text: string,
    el?: keyof JSX.IntrinsicElements,
    className?: string
}

const AnimatedText = ({
    text,
    el: Wrapper = "p",
    className,
}: AnimatedTextProps) => {
    return (
        <Wrapper className = {className}>
            <span className="sr-only">{text}</span>
            <motion.span initial="hidden" animate="visible" transition={{staggerChildren: 0.05}} aria-hidden>
                {text.split('').map((char, i) => (
                    <motion.span
                        variants={defaultAnimations}
                        key={i}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </Wrapper>
    )
}

export default Content;