import { ArrowDown, Sparkles, Code, Palette, Bot, Cpu, Zap } from "lucide-react";

export const HeroSection = () => {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pb-24"
    >
      {/* Floating AI Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 sm:top-20 left-4 sm:left-10 animate-float">
          <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary/30" />
        </div>
        <div className="absolute top-20 sm:top-32 right-8 sm:right-16 animate-float-delayed">
          <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-secondary/40" />
        </div>
        <div className="absolute bottom-20 sm:bottom-32 left-8 sm:left-20 animate-float">
          <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-primary/20" />
        </div>
        
        {/* New AI-themed floating elements */}
        <div className="absolute top-1/3 right-4 sm:right-10 animate-float">
          <Bot className="h-8 w-8 sm:h-12 sm:w-12 text-accent/20" />
        </div>
        <div className="absolute top-2/3 left-8 sm:left-16 animate-float-delayed">
          <Cpu className="h-5 w-5 sm:h-7 sm:w-7 text-secondary/30 animate-spin" style={{animationDuration: '8s'}} />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float">
          <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-primary/25" />
        </div>
        
        {/* AI Circuit Lines */}
        <div className="absolute top-1/4 left-1/3 w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-16 h-0.5 bg-gradient-to-r from-transparent via-secondary/20 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Data Particles */}
        <div className="absolute top-1/5 left-1/2 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/5 left-1/5 w-1 h-1 bg-accent/40 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-2/5 right-1/5 w-1.5 h-1.5 bg-secondary/35 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
      </div>

      <div className="container max-w-5xl mx-auto text-center z-10 pt-40 sm:pt-32">
        <div className="space-y-8 mt-12 sm:mt-16">
          {/* Main Heading with Enhanced Animation */}
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
              <span className="opacity-0 animate-fade-in block"> Hi, I'm</span>
              <span className="text-primary opacity-0 animate-fade-in-delay-1 relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"></span>
                <span className="relative">Davina</span>
              </span>
              <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2 relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"></span>
                <span className="relative">Azalia</span>
              </span>
            </h1>
          </div>

          {/* Enhanced Subtitle */}
          <div className="relative opacity-0 animate-fade-in-delay-3">
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              I craft <span className="text-primary font-semibold">intelligent digital experiences</span> powered by AI and modern web technologies. 
              <br className="hidden sm:block" />
              With a passion for <span className="text-secondary font-semibold">machine learning</span>, <span className="text-primary font-semibold">UI/UX design</span>, and <span className="text-accent font-semibold">full-stack development</span>.
            </p>
          </div>

          {/* Enhanced Call-to-Action Buttons */}
          <div className="pt-8 opacity-0 animate-fade-in-delay-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#projects" 
              className="cosmic-button group relative overflow-hidden px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary/30 text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300 text-lg font-semibold hover:scale-105"
            >
              Let's Connect
              <Sparkles className="h-5 w-5" />
            </a>
          </div>

          {/* Stats or Highlights */}
          <div className="pt-16 opacity-0 animate-fade-in-delay-5 mb-24">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="group">
                <div className="text-2xl sm:text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">3+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-bold text-secondary group-hover:scale-110 transition-transform duration-300">15+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-bold text-accent group-hover:scale-110 transition-transform duration-300">10+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 opacity-0 animate-fade-in-delay-6">
        <span className="text-sm text-muted-foreground mb-3 font-medium animate-float-smooth"> 
          Scroll to explore
        </span>
        <div 
          className="p-3 rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm cursor-pointer group hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          onClick={scrollToNextSection}
        >
          <ArrowDown className="h-5 w-5 text-primary group-hover:text-primary transition-colors duration-300 animate-bounce" />
        </div>
      </div>
    </section>
  );
};