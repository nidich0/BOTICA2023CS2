import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";

export default function ClientModal({
  isOpen,
  setIsOpen,
  setSelected,
  setClients,
}) {
  const [dni, setDni] = useState("");
  const [client, setClient] = useState({
    name: "",
    address: "",
    telephone: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  async function fetchReniecData(dni) {
    const apiUrl = `/clients/dnis/${dni}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      debugger
      if (data.error) {
        toast.error(data.error);
        return;
      } else {
        setClient({
          name: data.name,
          address: "",
          telephone: "",
        });
      }

      return data;
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Error al obtener los datos del cliente");
    }
  }

  async function handleDniChange(event) {
    const dni = event.target.value;
    setDni(dni);

    if (dni.length === 8) {
      await fetchReniecData(dni);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const elements = event.target.elements;
    const client = {
      name: elements["name"].value,
      address: elements["address"].value,
      telephone: elements["telephone"].value,
      dni: elements["dni"].value,
    };

    try {
      const response = await fetch("/clients.json", {
        method: "POST",
        body: JSON.stringify({ client }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const newClient = { id: data.id, name: data.name };
      setClients((clients) => [...clients, newClient]);
      setSelected(newClient);

      // limpiar formulario
      setClient({
        name: "",
        address: "",
        telephone: "",
      });
      setDni("");

      toast.success("Cliente creado con éxito");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al crear el cliente");
    } finally {
      closeModal();
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-500 uppercase mb-4"
                  >
                    Nuevo cliente
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label
                          htmlFor="dni"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Dni
                        </label>
                        <input
                          type="number"
                          minLength="8"
                          maxLength="8"
                          onChange={(e) => handleDniChange(e)}
                          value={dni}
                          id="dni"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          placeholder="Dni"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Nombre
                        </label>
                        <input
                          type="name"
                          id="name"
                          value={client.name}
                          onChange={(e) => setClient({ ...client, name: e.target.value })}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          placeholder="Nombre"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="address"
                          value={client.address}
                          onChange={(e) => setClient({ ...client, address: e.target.value })}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Dirección
                        </label>
                        <input
                          type="address"
                          id="address"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          placeholder="Dirección"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="telephone"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          value={client.telephone}
                          onChange={(e) => setClient({ ...client, telephone: e.target.value })}
                        >
                          Telefono
                        </label>
                        <input
                          type="telephone"
                          id="telephone"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          placeholder="Telefono"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Enviar
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
