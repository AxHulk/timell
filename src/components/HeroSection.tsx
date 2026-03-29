import { Button } from "@/components/ui/button";
import planetImg from "@/assets/planet_orbit.webp";
import moonImg from "@/assets/moon_orbits.webp";

const HeroSection = () => (
  <section className="relative overflow-hidden py-20 lg:py-28">
    {/* Decorative bg */}
    <div className="absolute inset-0 bg-accent/30" />
    <img src={moonImg} alt="" className="absolute top-10 right-0 w-[500px] opacity-20 pointer-events-none select-none" />

    <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display leading-tight text-foreground">
          Платформа для работы с&nbsp;
          <span className="text-primary">самозанятыми</span>, физлицами и&nbsp;ИП
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          Timell берёт на себя всю бумажную и платёжную рутину. Легально, безопасно и автоматически.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="text-base px-8">Обсудить ваш кейс</Button>
          <Button size="lg" variant="outline" className="text-base px-8 border-secondary text-secondary hover:bg-secondary/10">
            Попробовать бесплатно
          </Button>
        </div>
      </div>

      <div className="hidden lg:flex justify-center">
        <img src={planetImg} alt="Timell платформа" className="w-full max-w-md" />
      </div>
    </div>
  </section>
);

export default HeroSection;
