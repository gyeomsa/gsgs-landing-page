interface SectionTitleProps {
  title: string;
  description: string;
}

function SectionTitle({ description, title }: SectionTitleProps) {
  return (
    <div className="gap-gsgs-8 desktop:gap-gsgs-12 py-gsgs-48 desktop:py-gsgs-80 flex flex-col items-center">
      <p className="typography-body-2 text-semantic-text-secondary">{description}</p>
      <h3 className="typography-heading-3 text-semantic-text-default">{title}</h3>
    </div>
  );
}

export default SectionTitle;
