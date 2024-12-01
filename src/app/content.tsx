"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Content = () => {
    return (
        <div className="grid grid-cols-3 h-[calc(100vh-4.5rem)] w-full">
            <div className="h-[calc(100vh-4.5rem)] text-center text-7xl flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                <motion.div
                initial={{opacity: 1}}
                animate={{opacity: 0}}
                transition={{ delay: 3, staggerChildren: 0.05}}
                >
                    <AnimatedText text="Plan your memories here" />
                </motion.div>
            </div>
        <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 4.5 }}
        >
            <Image
            src="/assets/wedding-shoes.jpg"
            alt="Picture of the author"
            layout="fill" // Make the image fill its container
            objectFit="cover" // Ensure the image covers the container
            objectPosition="center" // Align the image center
            />
        </motion.div>

        <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 5.5 }}
        >
            <Image
            src="/assets/img-2.jpg"
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            />
        </motion.div>

        <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 6.5 }}
        >
            <Image
            src="/assets/img-3.jpg"
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            />
        </motion.div>
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

type AnimatedImageProps = {
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
                {text.split('').map(char => (
                    <motion.span
                        variants={defaultAnimations}
                        key={char}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </Wrapper>
    )
}

const AnimatedImage = ({el: Wrapper = "p", className}: AnimatedImageProps) => {
    return (
        <Wrapper className = {className}>
            <motion.div initial="hidden" animate="visible" transition={{staggerChildren: 0.05}}>
                
            </motion.div>
        </Wrapper>
    )
}

export default Content;