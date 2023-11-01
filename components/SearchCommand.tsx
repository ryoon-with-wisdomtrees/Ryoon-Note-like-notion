"use client";
import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const unarchivedDocuments = useQuery(api.documents.getSearch); //archived되지않는 문서 get
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
    //prevent hydration errors with stuff like dialogs and command usese dialogue in the background
    /**
     * 이렇게 하는 이유는 "use client";라고 mark해놨더라도
     * Next.js가 still going to do some Server Side Rendering을 first로 할거기 때문이다.
     * 그리고 다이알로그나 지금 작성하는 SearchCommand는(dynamically하게 appear될 수 있는) can appear on a shortcut,
     * That can cause hydration errors.
     * Bcuz, in Server Side, It's not gonna exist and then it reaches client side,
     * 그러면 별안간 exists here되니까. 우린 그걸 hydration error라고 불러요 ^^*
     *
     * 그래서 그걸 Prevent해요
     * By not even allowing it to be rendered on the Server side.
     * use client만으론 충분치않아~(그래도 조금은 SSR을 얘가 한단 말임.)
     * 그래서 setIsMounted(true) 트릭을 쓰는거야. 진짜 "마운티드"될 때, 모든것을 렌더링하기 위해.
     *
     */
  }, []);

  //언제든지 이 searchDialogue를 open할 수 있는 shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        //맥북이랑 윈도우 커버
        e.preventDefault();
        toggle();
      }
      //unmount일때는 이벤트리스너 remove
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    };
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }
  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s ryoon-note...`} />
      <CommandList>
        <CommandEmpty>No Results Found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {unarchivedDocuments?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={() => onSelect(doc._id)}
            >
              {doc.icon ? (
                <p className="mr-2 text-[18px]">{doc.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span> {doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
