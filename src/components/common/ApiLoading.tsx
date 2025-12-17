import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

export function Loading() {
  return (
    <div className="flex w-full justify-center max-w-sm gap-4">
      <InputGroup
        className="bg-black border border-black text-white"
        data-disabled
      >
        <InputGroupInput
          placeholder="Post Loading..."
          disabled
          className="bg-black text-white placeholder:text-gray-400"
        />
        <InputGroupAddon
          align="inline-end"
          className="bg-black text-white"
        >
          <Spinner className="text-white" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
