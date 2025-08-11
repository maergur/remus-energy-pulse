import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next'

const CarouselContext = React.createContext<
  | UseEmblaCarouselType[1]
  | undefined
>(undefined)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    opts?: Parameters<typeof useEmblaCarousel>[1]
    plugins?: Parameters<typeof useEmblaCarousel>[2]
    orientation?: "horizontal" | "vertical"
  }
>(({ orientation = "horizontal", opts, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )

  return (
    <CarouselContext.Provider value={api}>
      <div
        ref={ref}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        <div ref={carouselRef} className="overflow-hidden">
          <div className="-ml-4 flex touch-pan-y">{children}</div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ orientation = "horizontal", className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "-ml-4 flex",
      orientation === "horizontal" ? "flex-row" : "flex-col",
      className
    )}
    {...props}
  />
))
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)} {...props} />
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, orientation = "horizontal", ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">{t('common.previousSlide')}</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, orientation = "horizontal", ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">{t('common.nextSlide')}</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
