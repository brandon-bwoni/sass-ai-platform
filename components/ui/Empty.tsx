import Image from "next/image";
import empty from '@/public/empty.png'

interface EmptyProps{
  label: string
}

export const Empty = ({
  label
}: EmptyProps) => {
  return ( 
    <div className="h-full p-20 flex flex-col items-center top-0">
      <div className="relative h-72 w-72">
      <p className="text-muted-foreground text-sm text-center">
        {label}
        </p>
      <Image
        alt="Empty"
        fill
        src={empty}
      />
      </div>
    </div>
   );
}
 
