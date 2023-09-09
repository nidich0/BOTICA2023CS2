import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import ClientModal from "./ClientModal";

function formatClient(client) {
  return { id: client.id, name: client.name };
}

export default function Client({ setClientId }) {
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/clients.json")
      .then((response) => response.json())
      .then((data) => {
        setClients(data.map(formatClient));
      });
  }, []);

  useEffect(() => {
    setClientId(selected?.id);
  }, [selected]);

  const handleClear = () => {
    setQuery("");
    setSelected("");
  };

  const filteredClients =
    query === ""
      ? clients
      : clients.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="relative flex items-center z-10">
      <div className="text-gray-700 mr-2">Cliente:</div>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person) => person?.name}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar cliente"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {(query || selected) && (
                <button onClick={handleClear}>
                  <XMarkIcon
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    aria-hidden="true"
                  />
                </button>
              )}
              <Combobox.Button className="flex items-center">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredClients.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block text-teal-600 hover:text-teal-800 font-medium"
                  >
                    Agregar cliente
                  </button>
                </div>
              ) : (
                filteredClients.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <ClientModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setSelected={setSelected}
        setClients={setClients}
      />
    </div>
  );
}
