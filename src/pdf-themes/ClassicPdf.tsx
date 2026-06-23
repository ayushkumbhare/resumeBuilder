import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import type { ResumeData, StyleOptions } from '../types';

// Register standard fonts or fallback to Helvetica
// For a production app, we would register actual TTF/WOFF fonts for 'Inter' etc.
// Here we use Helvetica as a safe fallback that @react-pdf/renderer supports natively.

const createStyles = (styles: StyleOptions) => {
  const primaryColor = styles.primaryColor || '#0F2A4A';
  const bodySize = (styles.bodyFontSize || 9.5) + (styles.globalFontScale || 0);
  const headingSize = (styles.headingSize || 12) + (styles.globalFontScale || 0);
  const nameSize = (styles.nameSize || 22) + (styles.globalFontScale || 0);
  const lineHeight = styles.lineHeight || 1.4;
  const sectionSpacing = (styles.sectionSpacing ?? 10) * 0.5;
  const marginMm = styles.documentMargin || 14;

  return StyleSheet.create({
    page: {
      padding: `${marginMm}mm 18mm`,
      fontFamily: 'Helvetica',
      fontSize: bodySize,
      lineHeight: lineHeight,
      color: '#1a1a1a',
      backgroundColor: '#fff',
    },
    header: {
      textAlign: 'center',
    },
    name: {
      fontSize: nameSize,
      color: primaryColor,
      fontWeight: 'bold',
      letterSpacing: 1.5,
      marginBottom: 2,
      fontFamily: 'Helvetica-Bold',
      lineHeight: 1.15,
    },
    headline: {
      fontSize: bodySize,
      color: '#555',
      marginBottom: 3,
      lineHeight: 1.2,
    },
    contactsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    contactItemWrap: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contactItemText: {
      color: '#444',
    },
    section: {
      marginTop: sectionSpacing,
    },
    sectionTitle: {
      fontSize: headingSize,
      color: primaryColor,
      fontFamily: 'Helvetica-Bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      borderBottomWidth: 1.5,
      borderBottomColor: primaryColor,
      paddingBottom: 2,
      marginBottom: 3,
    },
    body: {
      fontSize: bodySize,
      color: '#222',
    },
    skillRow: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    skillKey: {
      width: '42mm',
      color: primaryColor,
      fontFamily: 'Helvetica-Bold',
    },
    skillVal: {
      flex: 1,
      color: '#222',
    },
    expItem: {
      marginBottom: 5,
    },
    expHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    expCompany: {
      fontFamily: 'Helvetica-Bold',
      color: '#111',
    },
    expLocation: {
      color: '#555',
    },
    expPeriod: {
      color: '#555',
    },
    expTitle: {
      color: '#444',
      fontStyle: 'italic',
      marginBottom: 3,
    },
    bullets: {
      paddingLeft: 14,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 1.5,
    },
    bulletPoint: {
      width: 10,
    },
    bulletText: {
      flex: 1,
    },
    subheadingText: {
      fontFamily: 'Helvetica-Bold',
      marginTop: 2,
      marginBottom: 1,
    }
  });
};

interface ClassicPdfProps {
  data: ResumeData;
  styles: StyleOptions;
}

export function ClassicPdf({ data, styles }: ClassicPdfProps) {
  const s = createStyles(styles);
  const pi = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{pi.name || 'Your Name'}</Text>
          {pi.headline && <Text style={s.headline}>{pi.headline}</Text>}
          <View style={s.contactsContainer}>
            {['phone', 'email', 'linkedin', 'github', 'website', 'location']
              .filter(f => (pi as any)[f])
              .map((f, i, arr) => (
                <View key={f} style={s.contactItemWrap}>
                  <Text style={s.contactItemText}>{(pi as any)[f]}</Text>
                  {i < arr.length - 1 && <Text style={s.contactItemText}>{'  ·  '}</Text>}
                </View>
              ))}
          </View>
        </View>

        {pi.summary && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Professional Summary</Text>
            <Text style={s.body}>{pi.summary}</Text>
          </View>
        )}

        {data.skills.filter(sk => sk.visible).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Technical Skills</Text>
            {data.skills.filter(sk => sk.visible).map(sk => (
              <View key={sk.id} style={s.skillRow}>
                <Text style={s.skillKey}>{sk.category}:</Text>
                <Text style={s.skillVal}>{sk.items}</Text>
              </View>
            ))}
          </View>
        )}

        {data.experience.filter(e => e.visible).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Work Experience</Text>
            {data.experience.filter(e => e.visible).map(exp => (
              <View key={exp.id} style={s.expItem}>
                <View style={s.expHeader}>
                  <Text style={s.expCompany}>
                    {exp.company}
                    {exp.location && <Text style={s.expLocation}> — {exp.location}</Text>}
                  </Text>
                  <Text style={s.expPeriod}>{exp.period}</Text>
                </View>
                {exp.title && <Text style={s.expTitle}>{exp.title}</Text>}
                <View style={s.bullets}>
                  {exp.bullets.filter(b => b.visible).map(b => (
                    b.isSubheading ? (
                      <Text key={b.id} style={s.subheadingText}>{b.text}</Text>
                    ) : (
                      <View key={b.id} style={s.bulletItem}>
                        <Text style={s.bulletPoint}>•</Text>
                        <Text style={s.bulletText}>{b.text}</Text>
                      </View>
                    )
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.projects.filter(p => p.visible).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Personal Projects</Text>
            {data.projects.filter(p => p.visible).map(proj => (
              <View key={proj.id} style={s.expItem}>
                <View style={s.expHeader}>
                  <Text style={s.expCompany}>
                    {proj.title}
                    {proj.subtitle && <Text style={s.expLocation}> — {proj.subtitle}</Text>}
                  </Text>
                </View>
                <View style={s.bullets}>
                  {proj.bullets.filter(b => b.visible).map(b => (
                    b.isSubheading ? (
                      <Text key={b.id} style={s.subheadingText}>{b.text}</Text>
                    ) : (
                      <View key={b.id} style={s.bulletItem}>
                        <Text style={s.bulletPoint}>•</Text>
                        <Text style={s.bulletText}>{b.text}</Text>
                      </View>
                    )
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.education.filter(e => e.visible).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Education</Text>
            {data.education.filter(e => e.visible).map(edu => (
              <View key={edu.id} style={s.expItem}>
                <View style={s.expHeader}>
                  <Text style={s.expCompany}>{edu.institution}</Text>
                  <Text style={s.expPeriod}>{edu.period}</Text>
                </View>
                <Text style={s.expTitle}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {data.responsibilities.filter(r => r.visible).length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Positions of Responsibility</Text>
            <View style={s.bullets}>
              {data.responsibilities.filter(r => r.visible).map(r => (
                <View key={r.id} style={s.bulletItem}>
                  <Text style={s.bulletPoint}>•</Text>
                  <Text style={s.bulletText}>{r.text}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
