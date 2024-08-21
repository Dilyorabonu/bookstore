import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { useCartStore } from "@/lib/zustand"; // Import Zustand store

export default function BookDetailsModal({ book, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => setQuantity(quantity + 1);
  const handleRemove = () => setQuantity(Math.max(1, quantity - 1));

  const handleAddToCart = () => {
    addToCart({ ...book, quantity });
    onClose(); // Close the modal after adding to cart
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <h2 className="text-xl font-semibold">{book.title}</h2>
      </DialogHeader>
      <DialogBody className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">{book.description}</p>
        <div className="flex items-center space-x-4">
          <Button onClick={handleRemove}>
            <MinusIcon className="w-4 h-4" />
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button onClick={handleAdd}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
