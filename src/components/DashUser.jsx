import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, islogged } from "../api/auth.api.js";
import { getReceiveFriendRequest, GetAllFriend } from "../api/suggestion.api.js";

function DashUser() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState({ text: "", author: "" });
  const navigate = useNavigate();

  const quotes = [
    { text: "Le savoir est la seule chose qui s'accroît quand on la partage.", author: "Socrate" },
    { text: "On apprend en enseignant.", author: "Sénèque" },
    { text: "Le partage des compétences est le cadeau qui continue de donner.", author: "Inconnu" },
    { text: "Nous sommes tous des experts dans quelque chose.", author: "Inconnu" },
    { text: "La meilleure façon de prédire l'avenir est de le créer ensemble.", author: "Peter Drucker" },
  ];

  useEffect(() => {
    if (!islogged()) {
      navigate("/connexion");
      return;
    }

    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Bonjour");
    else if (hours < 18) setGreeting("Bon après-midi");
    else setGreeting("Bonsoir");

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const loadUser = () => {
      const userData = getUser();
      setUser(userData);
    };
    loadUser();
  }, [navigate]);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await getReceiveFriendRequest();
        setRequests(response.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    loadRequests();
  }, []);

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const response = await GetAllFriend();
        setFriends(response.data.data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des amis:', error);
      }
    };
    loadFriends();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Préparation de votre espace...</p>
        </div>
      </div>
    );
  }

  const pendingRequests = requests.length;
  const friendsCount = friends.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl transform rotate-1 scale-105 opacity-20"></div>
          <div className="relative bg-white rounded-3xl shadow-xl p-8 sm:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full filter blur-3xl opacity-20 -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-2 tracking-wider uppercase">
                    {greeting}
                  </p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {user.name}
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl">
                    {quote.text}
                  </p>
                  <p className="text-sm text-gray-500 mt-2 italic">
                    — {quote.author}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                    <span className="text-3xl font-bold text-white">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-gray-900">{friendsCount}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Amis</h3>
            <p className="text-sm text-gray-400 mt-1">Connexions établies</p>
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(friendsCount * 10, 100)}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-gray-900">{pendingRequests}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Demandes reçues</h3>
            <p className="text-sm text-gray-400 mt-1">En attente</p>
            {pendingRequests > 0 && (
              <button 
                onClick={() => navigate('/dashboard/suggestions', { state: { tab: 'received' } })}
                className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
              >
                Voir les demandes
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-gray-900">{friendsCount * 2}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Messages</h3>
            <p className="text-sm text-gray-400 mt-1">Cette semaine</p>
            <button 
              onClick={() => navigate('/dashboard/messages')}
              className="mt-4 w-full py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 text-sm font-medium rounded-lg transition-colors"
            >
              Voir les conversations
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Actions rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/dashboard/compétences")}
              className="group relative p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-left hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">Voir les compétences</h3>
                <p className="text-blue-100 text-sm">Partagez votre savoir avec la communauté</p>
              </div>
            </button>

            <button
              onClick={() => navigate("/dashboard/suggestions")}
              className="group relative p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-left hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">Trouver des amis</h3>
                <p className="text-purple-100 text-sm">Découvrez des personnes avec qui échanger</p>
              </div>
            </button>
          </div>
        </div>

        {friends.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Amitié récente</h2>
              <button 
                onClick={() => navigate('/dashboard/friends')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Voir tout
              </button>
            </div>
            <div className="space-y-4">
              {friends.slice(0, 3).map((friend) => (
                <div key={friend.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    {friend.matched_user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{friend.matched_user?.name}</p>
                    <p className="text-xs text-gray-500">Nouvel ami • {new Date(friend.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashUser;