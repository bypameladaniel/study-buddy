import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Flashcard {
  question: string;
  answer: string;
}

const sampleFlashcards: Flashcard[] = [
  {
    question: "What is the primary goal of user interface design?",
    answer:
      "To design interfaces that are easy to use and provide a pleasant experience for users.",
  },
  {
    question: "What are the four main types of user interface elements?",
    answer:
      "Input controls, navigation components, informational components, and containers.",
  },
  {
    question: "What is the principle of least surprise in UI design?",
    answer:
      "The interface should behave predictably so users can anticipate what will happen next.",
  },
  {
    question: "Why is recoverability important in UI design?",
    answer:
      "Because users will make mistakes, and good interfaces help them recover from those errors.",
  },
];

export default function FlashcardsPage() {
  const [flashcards] = useState<Flashcard[]>(sampleFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = useMemo(() => flashcards[currentIndex], [flashcards, currentIndex]);

  const goToNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const goToPrevious = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const flipCard = () => {
    setShowAnswer((prev) => !prev);
  };

  const progressPercent = ((currentIndex + 1) / flashcards.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm shadow-sm">
              <Sparkles className="h-4 w-4" />
              AI Study Tool
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Flashcards</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Review one concept at a time. Click the card to flip between the question and answer.
            </p>
          </div>

          <Card className="w-full max-w-xs rounded-2xl border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Progress</span>
                <span>
                  {currentIndex + 1} / {flashcards.length}
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${showAnswer ? "answer" : "question"}`}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={flipCard}
                  className="group w-full text-left"
                  aria-label="Flip flashcard"
                >
                  <Card className="min-h-[420px] rounded-[28px] border-0 bg-white shadow-lg transition-transform duration-200 group-hover:-translate-y-1">
                    <CardContent className="flex h-full flex-col justify-between p-8 md:p-10">
                      <div className="flex items-center justify-between text-sm font-medium text-slate-500">
                        <span>{showAnswer ? "Answer" : "Question"}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                          Tap to flip
                        </span>
                      </div>

                      <div className="flex flex-1 items-center justify-center py-10">
                        <p className="max-w-2xl text-center text-2xl font-semibold leading-relaxed text-slate-900 md:text-3xl">
                          {showAnswer ? currentCard.answer : currentCard.question}
                        </p>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                          {showAnswer ? "Showing answer" : "Showing question"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={goToPrevious}
                className="rounded-2xl px-5 py-6"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button onClick={flipCard} className="rounded-2xl px-6 py-6">
                <RotateCcw className="mr-2 h-4 w-4" />
                Flip Card
              </Button>

              <Button
                variant="outline"
                onClick={goToNext}
                className="rounded-2xl px-5 py-6"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="h-fit rounded-[28px] border-0 bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900">Card List</h2>
              <p className="mt-1 text-sm text-slate-600">
                Jump directly to any flashcard in the set.
              </p>

              <div className="mt-5 space-y-3">
                {flashcards.map((card, index) => {
                  const isActive = index === currentIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setShowAnswer(false);
                      }}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        isActive
                          ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      <div className="mb-2 text-xs font-medium opacity-80">Card {index + 1}</div>
                      <div className="line-clamp-3 text-sm font-medium leading-6">
                        {card.question}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
