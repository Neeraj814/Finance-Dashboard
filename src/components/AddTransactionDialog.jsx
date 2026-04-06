import React, { useState } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Card,
  CardBody
} from "@nextui-org/react";
import { Plus, Wallet, Calendar, Tag, CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { motion } from "framer-motion";

import { useFinance } from "@/store/FinanceContext";
import { CATEGORIES } from "@/types/finance";

export function AddTransactionDialog() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addTransaction, role } = useFinance();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  if (role !== "admin") return null;

  const handleSubmit = (onClose) => {
    if (!form.description || !form.amount) return;
    
    setLoading(true);
    setTimeout(() => {
      addTransaction({ ...form, amount: parseFloat(form.amount) });
      setLoading(false);
      onClose(); 
      setForm({
        description: "",
        amount: "",
        category: "Food",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      });
    }, 800);
  };

  return (
    <>
      {/* 🟢 Trigger Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button 
          onPress={onOpen}
          color="primary"
          endContent={<Plus size={18} />}
          className="bg-indigo-600 shadow-lg shadow-indigo-500/20 font-semibold px-6 h-11 rounded-xl"
        >
          New Transaction
        </Button>
      </motion.div>

      {/* 🟢 NextUI Professional Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        classNames={{
          base: "border border-white/10 bg-slate-950/90 backdrop-blur-2xl max-w-[450px]",
          header: "border-b border-white/5",
          footer: "border-t border-white/5",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-white">Add Transaction</h2>
                <p className="text-xs text-slate-400 font-normal">Track your flow and grow your wealth.</p>
              </ModalHeader>

              <ModalBody className="py-6">
                <div className="flex flex-col gap-6">
                  
                  {/* Description Input */}
                  <Input
                    label="Description"
                    placeholder="E.g. Freelance Project"
                    labelPlacement="outside"
                    startContent={<CreditCard className="text-slate-400" size={18} />}
                    variant="bordered"
                    value={form.description}
                    onValueChange={(v) => setForm({...form, description: v})}
                    classNames={{
                      label: "text-slate-300 font-medium",
                      inputWrapper: "border-white/10 bg-white/5 h-12 rounded-xl focus-within:!border-indigo-500",
                      input: "text-white placeholder:text-slate-500"
                    }}
                  />

                  <div className="flex gap-4">
                    {/* Amount Input */}
                    <Input
                      type="number"
                      label="Amount"
                      placeholder="0.00"
                      labelPlacement="outside"
                      startContent={<span className="text-slate-400 text-sm">₹</span>}
                      variant="bordered"
                      value={form.amount}
                      onValueChange={(v) => setForm({...form, amount: v})}
                      className="flex-1"
                      classNames={{
                        label: "text-slate-300 font-medium",
                        inputWrapper: "border-white/10 bg-white/5 h-12 rounded-xl focus-within:!border-indigo-500",
                        input: "text-white"
                      }}
                    />

                    {/* Date Input */}
                    <Input
                      type="date"
                      label="Date"
                      labelPlacement="outside"
                      variant="bordered"
                      value={form.date}
                      onValueChange={(v) => setForm({...form, date: v})}
                      className="flex-1"
                      classNames={{
                        label: "text-slate-300 font-medium",
                        inputWrapper: "border-white/10 bg-white/5 h-12 rounded-xl focus-within:!border-indigo-500 [color-scheme:dark]",
                        input: "text-white"
                      }}
                    />
                  </div>

                  <div className="flex gap-4">
                    {/* Type Select */}
                    <Select
                      label="Transaction Type"
                      labelPlacement="outside"
                      variant="bordered"
                      selectedKeys={[form.type]}
                      onSelectionChange={(keys) => setForm({...form, type: Array.from(keys)[0]})}
                      className="flex-1"
                      classNames={{
                        label: "text-slate-300 font-medium",
                        trigger: "border-white/10 bg-white/5 h-12 rounded-xl focus-within:!border-indigo-500",
                        value: "text-white text-sm",
                        popoverContent: "bg-slate-900 border-white/10 text-white"
                      }}
                    >
                      <SelectItem key="income" startContent={<ArrowUpRight size={16} className="text-emerald-500" />}>
                        Income
                      </SelectItem>
                      <SelectItem key="expense" startContent={<ArrowDownLeft size={16} className="text-rose-500" />}>
                        Expense
                      </SelectItem>
                    </Select>

                    {/* Category Select */}
                    <Select
                      label="Category"
                      labelPlacement="outside"
                      variant="bordered"
                      selectedKeys={[form.category]}
                      onSelectionChange={(keys) => setForm({...form, category: Array.from(keys)[0]})}
                      className="flex-1"
                      classNames={{
                        label: "text-slate-300 font-medium",
                        trigger: "border-white/10 bg-white/5 h-12 rounded-xl focus-within:!border-indigo-500",
                        value: "text-white text-sm",
                        popoverContent: "bg-slate-900 border-white/10 text-white"
                      }}
                    >
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} className="capitalize">
                          {cat}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
                  className="text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  isLoading={loading}
                  onPress={() => handleSubmit(onClose)}
                  className="bg-indigo-600 text-white font-bold px-8 rounded-xl shadow-lg shadow-indigo-500/20"
                >
                  Confirm Entry
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}