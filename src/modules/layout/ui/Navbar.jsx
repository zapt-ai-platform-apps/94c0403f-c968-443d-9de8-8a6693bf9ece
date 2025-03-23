import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img 
              src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=32&height=32"
              alt="Dump.fun Logo"
              className="h-8 w-8 mr-2"
            />
            <h1 className="text-xl font-bold text-blue-600">Dump.fun</h1>
          </div>
          <div className="hidden md:flex space-x-1">
            <NavLink 
              to="/" 
              className={({isActive}) => isActive ? "navbar-link-active" : "navbar-link"}
              end
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/dumpers" 
              className={({isActive}) => isActive ? "navbar-link-active" : "navbar-link"}
            >
              Top Dumpers
            </NavLink>
            <NavLink 
              to="/bonders" 
              className={({isActive}) => isActive ? "navbar-link-active" : "navbar-link"}
            >
              Bonders
            </NavLink>
            <NavLink 
              to="/pumpers" 
              className={({isActive}) => isActive ? "navbar-link-active" : "navbar-link"}
            >
              Pumpers
            </NavLink>
          </div>
        </div>
        <div className="md:hidden flex overflow-x-auto py-2 -mx-4 px-4 space-x-1">
          <NavLink 
            to="/" 
            className={({isActive}) => isActive ? "navbar-link-active" : "navbar-link"}
            end
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/dumpers" 
            className={({isActive}) => isActive ? "navbar-link-active" : "navbar-link"}
          >
            Top Dumpers
          </NavLink>
          <NavLink 
            to="/bonders" 
            className={({isActive}) => isActive ? "navbar-link-active" : "navbar-link"}
          >
            Bonders
          </NavLink>
          <NavLink 
            to="/pumpers" 
            className={({isActive}) => isActive ? "navbar-link-active" : "navbar-link"}
          >
            Pumpers
          </NavLink>
        </div>
      </div>
    </nav>
  );
}