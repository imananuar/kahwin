'use client';

export default function Layout({ children }: Readonly<{children: React.ReactNode;}>) {
    return (
        <div>
            <p>Hello bitch</p>
            {children}
        </div>        
    )
}