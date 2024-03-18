import React, { useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Skeleton from "@mui/material/Skeleton";
import { MenuSquare, Search } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { useModal } from "@/stores/use-modal-store";
import { useModalTableStore } from "@/stores/use-modal-table-store";

type FormState = any;

export interface IModalData {
  type: string;
  renderKey?: string;
  data: any;
}
export interface IFormFieldData {
  type: string;
  label: string;
  state: string;
  require?: boolean;
  valueState?: string;
  valueKey?: string;
  renderKey?: string;
  selectors?: { [key: string]: string }[];
  url?: string;
  defaultValue?: string;
  disabledKey?: string;
  openModal?: string;
}

interface GenericFormProps {
  data?: any; //for view or edit by id
  formData: IFormFieldData[];
  form: any; // Replace with the appropriate type from react-hook-form
  selectKey: number;
  pageAction?: string;
  modalData?: IModalData[];
}

const AddNewForm: React.FC<GenericFormProps> = ({
  data,
  formData,
  form,
  selectKey,
  pageAction,
  modalData,
}) => {
  const { onOpen } = useModal();
  const { modalSelectedRow, setModalSelectedRow } = useModalTableStore();
  const onOpenModal = (modalName: string, data?: any) => {
    onOpen(modalName, data);
  };

  return (
    <Form {...form}>
      <form className="grid md:grid-cols-2 gap-x-2 gap-y-2">
        {formData?.map((el, idx) => {
          return el?.type === "input" ? (
            <FormField
              key={idx}
              control={form.control}
              name={el.state as FormState}
              render={({ field, fieldState }) => (
                <FormItem className="grid grid-cols-3 gap-x-1 space-y-0">
                  <FormLabel className="text-black">
                    {el.label}
                    {el.require && <span className="text-red-600"> *</span>}
                  </FormLabel>
                  <div className="col-span-2">
                    <FormControl>
                      <Input
                        key={selectKey}
                        placeholder={el.label}
                        className={`${
                          pageAction === "view"
                            ? "bg-gray-50 text-gray-400"
                            : ""
                        } ${fieldState.error ? "border-red-600" : ""}`}
                        {...field}
                        value={field.value?.toString()}
                        readOnly={pageAction === "view"}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ) : el?.type === "selector" ? (
            <FormField
              key={idx}
              control={form.control}
              name={el.state as FormState}
              render={({ field, fieldState }) => (
                <FormItem className="grid grid-cols-3 gap-x-1 space-y-0">
                  <FormLabel className="text-black">
                    {el.label}
                    {el.require && <span className="text-red-600"> *</span>}
                  </FormLabel>
                  <div className="col-span-2">
                    <Select
                      disabled={
                        pageAction === "view" ||
                        ((data?.[el.disabledKey as any] as string) === "N" &&
                          pageAction === "edit" &&
                          el.defaultValue)
                          ? true
                          : false
                      }
                      key={selectKey}
                      onValueChange={(value) => {
                        if (el?.valueKey !== undefined) {
                          const matchingObject = formData.find(
                            (item) => item.state === el.state
                          );
                          const matchingSelector =
                            matchingObject?.selectors?.find((item) => {
                              return item[el.valueKey as string] == value;
                            });

                          if (matchingSelector) {
                            if (el.state === "statusId") {
                              form.setValue(el.state as FormState, value);
                              form.setValue(
                                el.valueState as FormState,
                                (matchingSelector as any).lookupCode
                              );
                            } else {
                              form.setValue(el.state as FormState, value);
                              form.setValue(
                                el.valueState as FormState,
                                matchingSelector[el.renderKey as string]
                              );
                            }
                          }

                        }
                      }}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger
                        className={`${
                          pageAction === "view" && el.defaultValue
                            ? "bg-gray-100"
                            : ""
                        } ${fieldState.error ? "border-red-600" : ""}`}
                      >
                        <SelectValue placeholder="-Select-" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {el?.selectors?.map((selector, id) => {
                            const valueFromKey =
                              selector[el.valueKey as string]?.toString();
                            const renderFromKey =
                              selector[el.renderKey as string];
                            return (
                              <SelectItem
                                key={id}
                                value={valueFromKey}
                                className={`${
                                  field.value?.toString() === valueFromKey
                                    ? "bg-blue-300  hover:!bg-blue-300"
                                    : ""
                                }`}
                              >
                                {renderFromKey}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ) : el?.type === "textarea" ? (
            <FormField
              key={idx}
              control={form.control}
              name={el.state as FormState}
              render={({ field, fieldState }) => {
                return (
                  <FormItem className="grid grid-cols-3 gap-x-1 space-y-0">
                    <FormLabel className="text-black">
                      {el.label}
                      {el.require && <span className="text-red-600"> *</span>}
                    </FormLabel>
                    <div className="col-span-2">
                      <FormControl>
                        <Textarea
                          key={selectKey}
                          className={`${
                            pageAction === "view"
                              ? "bg-gray-50 text-gray-400"
                              : ""
                          }`}
                          placeholder=""
                          readOnly={pageAction === "view"}
                          {...field}
                          value={field.value?.toString()}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />
          ) : el?.type === "search" ? (
            // No need for wrapping <> here
            <div
              key={idx}
              className="h-[40px] grid grid-cols-3 gap-x-1 space-y-0 text-sm "
            >
              <span className="flex">
                {el.label}
                <Search
                  className="w-8 h-8 -mt-1 hover:bg-gray-100 p-2 rounded-full cursor-pointer"
                  onClick={() => onOpenModal(el?.openModal as string)}
                />
              </span>
              <span className="text-blue-600">
                {modalData?.find((item) => item?.renderKey === el.renderKey)
                  ?.data || ""}
              </span>
            </div>
          ) : el?.type === "checkbox" ? (
            <FormField
              key={idx}
              control={form.control}
              name={el.state as FormState}
              render={({ field, fieldState }) => (
                <FormItem className="grid grid-cols-3 gap-x-1 space-y-0">
                  <FormLabel className="text-black">
                    Approve Role (Override)
                  </FormLabel>
                  <FormControl>
                    <input
                      type="checkbox"
                      className={`${
                        pageAction === "view" ? "bg-gray-100 text-gray-400" : ""
                      } ${
                        fieldState.error ? "border-red-600" : ""
                      } w-4 h-4 text-blue-600  border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                      checked={!!field.value}
                      onChange={field.onChange}
                      disabled={pageAction === "view" ? true : false}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : el?.type === "date" ? (
            <FormField
              key={idx}
              control={form.control}
              name={el.state as FormState}
              render={({ field, fieldState }) => (
                <FormItem className="grid grid-cols-3 gap-x-1 space-y-0">
                  <FormLabel className="text-black">
                    {el.label}
                    {el.require && <span className="text-red-600"> *</span>}
                  </FormLabel>
                  <div className="col-span-2">
                    <DatePicker
                      value={field.value}
                      onValueChange={field.onChange}
                      className={`${
                        pageAction === "view" ? "bg-gray-50 text-gray-400" : ""
                      } ${fieldState.error ? "border-red-600" : ""}`}
                      isDisabled={pageAction === "view" ? true : false}
                    />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ) : el?.type === "userAccessRights" ? (
            <div
              key={idx}
              className="h-[40px] grid grid-cols-3 gap-x-1 space-y-0 text-sm "
            >
              <span className="flex">
                {el.label}
                <MenuSquare
                  className="w-8 h-8 -mt-1 hover:bg-gray-100 p-2 rounded-full cursor-pointer"
                  onClick={() =>
                    onOpenModal(el?.openModal as string, modalData)
                  }
                />
              </span>
              <span className="text-blue-600">
                {modalSelectedRow?.[el.renderKey as string]}
              </span>
            </div>
          ) : (
            <div key={idx} className="h-[40px] text-sm">
              {el.label}
            </div>
          );
        })}
      </form>
    </Form>
  );
};

export default AddNewForm;
