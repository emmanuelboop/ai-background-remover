import { Button } from "@/components/ui/button"

function Navbar() {
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
            <h1 className="text-2xl font-bold">AI Background Remover</h1>
            <Button className="transition-all duration-300 hover:scale-105"
            onClick = {() => {
                document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            >
                Upload Image
            </Button>
        </nav>
    )
}

export default Navbar;